import { test, expect, type Locator, type Page, type TestInfo } from "@playwright/test"

async function expectNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
}

async function expectImageLoaded(image: Locator) {
  await expect.poll(() => image.evaluate(element => {
    const photo = element as HTMLImageElement
    return photo.complete && photo.naturalWidth > 0
  })).toBe(true)
}

async function capturePage(page: Page, testInfo: TestInfo, filename: string) {
  // Visit sections to reveal their content without scrolling every carousel slide.
  for (const heading of await page.locator("main h2").all()) {
    await heading.scrollIntoViewIfNeeded()
  }
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }))
  await expectNoOverflow(page)
  await page.screenshot({ path: testInfo.outputPath(filename), fullPage: true, scale: "css", animations: "disabled" })
}

async function archiveTotal(tab: Locator) {
  const count = (await tab.locator("span").last().innerText()).match(/^\s*(\d+)\s*$/)?.[1]
  if (!count) throw new Error("The gallery filter is missing its photo count")
  return Number(count)
}

async function expectPhotoSource(image: Locator, year: string) {
  const source = await image.getAttribute("src")
  if (!source) throw new Error("The gallery photo is missing its image source")
  const url = new URL(source, "http://127.0.0.1:3100")
  expect(url.searchParams.get("url") ?? decodeURIComponent(url.pathname)).toContain(`/images/${year}/`)
}

async function imagePath(image: Locator) {
  const source = await image.getAttribute("src")
  if (!source) throw new Error("The image is missing its source")
  const url = new URL(source, "http://127.0.0.1:3100")
  return decodeURIComponent(url.searchParams.get("url") ?? url.pathname)
}

test("home keeps the requested copy, single collaboration CTA and minimal footer", async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("VIAHACK")
  await expect(page.getByText("Next edition February 2027", { exact: true })).toBeVisible()
  await expect(page.locator("#home")).toContainText("Horsens, Denmark")
  for (const title of ["3rd edition of VIAHack", "Meet tech people", "Build the solution"]) {
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible()
  }
  const contact = page.locator("main").getByRole("link", { name: "Contact Us", exact: true })
  await expect(contact).toHaveCount(1)
  await expect(contact).toHaveAttribute("href", "mailto:hackathon@viauc.dk")
  await expect(page.getByText("Want to collaborate with us as a mentor, sponsor, or have an idea you'd like us to hear about? Contact us.", { exact: true })).toBeVisible()
  await expect(page.getByRole("link", { name: /Apply for Collaboration|Become a Sponsor/ })).toHaveCount(0)

  const editions = page.locator("#previous")
  await expect(editions).toContainText("2-3.05.2025")
  await expect(editions).toContainText("10 teams")
  await expect(editions).toContainText("20-21.03.2026")
  await expect(editions).toContainText("13 teams")
  expect(await imagePath(editions.locator("img").filter({ hasNot: page.locator("[alt='']") }).first())).toContain("/images/2026/75D9CE8E-E16F-4DF0-B9E6-248CC1BDD8C0.JPG.jpg")
  expect(await imagePath(editions.locator("img").nth(1))).toContain("/images/hackathon_2025_img2.jpg")
  expect(await page.locator("body").innerText()).not.toMatch(/\bVIAHACK\s*\./i)
  expect(await editions.innerText()).not.toMatch(/\b202[567]\./)

  const footer = page.getByRole("contentinfo")
  const location = footer.getByText("VIA University College, Horsens, Denmark", { exact: true })
  await expect(location).toBeVisible()
  expect(await location.evaluate(element => getComputedStyle(element).textAlign)).toBe("center")
  await expect(footer.locator("img")).toHaveCount(1)
  await expect(footer.locator("img")).toHaveAttribute("src", /icon\.png/)
  await expect(footer).toHaveText("VIA University College, Horsens, Denmark")
  await capturePage(page, testInfo, "home.png")
  expect(errors).toEqual([])
})

for (const edition of [
  { year: "2026", name: "ViaLive", projects: "13", projectsLabel: "Submitted projects", participants: "55+", prize: "19,000 DKK", github: "https://github.com/Bananapolis/Hackaton", sponsors: 4 },
  { year: "2025", name: "AI Recipe App", projects: "10", projectsLabel: "Projects", participants: "45+", prize: "10,000 DKK", github: "https://github.com/remixmid/VIAHack/tree/main", sponsors: 6 },
]) {
  test(`${edition.year} archive highlights its winner, verified stats and year-specific photos`, async ({ page }, testInfo) => {
    await page.goto(`/${edition.year}`)
    const hero = page.getByRole("heading", { level: 1 })
    await expect(hero).toContainText(edition.year)
    expect(await hero.innerText()).not.toContain(`${edition.year}.`)
    const stats = page.locator("dl > div")
    await expect(stats).toHaveCount(3)
    for (const [label, value] of [[edition.projectsLabel, edition.projects], ["Participants", edition.participants], ["Prizes worth", edition.prize]]) {
      await expect(stats.filter({ has: page.getByText(label, { exact: true }) })).toContainText(value)
    }
    const winner = page.locator("#winning-project")
    await expect(winner.getByRole("heading", { name: "Winning Project", exact: true })).toBeVisible()
    await expect(winner.locator("article")).toHaveCount(1)
    await expect(winner.getByRole("heading", { name: edition.name, exact: true })).toBeVisible()
    await expect(winner.getByRole("link", { name: `${edition.name} on GitHub (opens in a new tab)` })).toHaveAttribute("href", edition.github)
    await expect(page.getByText("Project to be announced", { exact: true })).toHaveCount(0)
    if (edition.year === "2026") {
      const preview = winner.locator("img").first()
      await preview.scrollIntoViewIfNeeded()
      await expectImageLoaded(preview)
      await expect(winner).toContainText("FastAPI")
      await expect(winner).toContainText("quizzes")
    } else {
      await expect(winner).toContainText("AI-powered ingredient detection")
      await expect(winner).toContainText("Recipe recommendations")
      await expect(winner).toContainText("Cross-platform setup")
      await expect(winner).toContainText("food waste")
    }

    const sponsors = page.getByRole("link", { name: /(?:sponsor|community partner) \(opens in a new tab\)/ })
    await expect(sponsors).toHaveCount(edition.sponsors)
    for (const sponsor of await sponsors.all()) {
      await sponsor.scrollIntoViewIfNeeded()
      await expectImageLoaded(sponsor.locator("img"))
    }
    if (edition.year === "2026") {
      const heights: number[] = []
      for (const tier of ["platinum", "gold", "silver"]) {
        const tierSponsors = page.getByRole("link", { name: new RegExp(`${tier} sponsor \\(opens in a new tab\\)`) })
        heights.push(await tierSponsors.first().locator("img").evaluate(image => image.getBoundingClientRect().height))
        const group = await tierSponsors.evaluateAll(elements => {
          const bounds = elements.map(element => element.getBoundingClientRect())
          return { left: Math.min(...bounds.map(rect => rect.left)), right: Math.max(...bounds.map(rect => rect.right)), width: window.innerWidth }
        })
        expect(Math.abs((group.left + group.right) / 2 - group.width / 2)).toBeLessThan(2)
      }
      expect(heights[0]).toBeGreaterThan(heights[1] * 1.3)
      expect(heights[1]).toBeGreaterThan(heights[2] * 1.3)
    }

    const carousel = page.getByRole("region", { name: `VIAHACK ${edition.year} gallery`, exact: true })
    await expect(carousel).toBeVisible()
    expect(await carousel.getByRole("button", { name: /^Open photo/ }).count()).toBeGreaterThan(1)
    await expectPhotoSource(carousel.locator("img").first(), edition.year)
    const carouselSources = await Promise.all((await carousel.locator("img").all()).map(imagePath))
    expect(new Set(carouselSources).size).toBeGreaterThan(1)
    expect(carouselSources.every(source => !/\.(?:heic|heif)(?:$|[?#])/i.test(source) && /\.(?:jpg|jpeg|png|webp)(?:$|[?#])/i.test(source))).toBe(true)
    await expect(page.getByRole("link", { name: "Explore more", exact: true })).toHaveAttribute("href", `/gallery?year=${edition.year}`)
    await capturePage(page, testInfo, `edition-${edition.year}.png`)
  })
}

test("gallery filters real archives and preserves keyboard navigation and focus", async ({ page }, testInfo) => {
  await page.goto("/gallery")
  const allTab = page.getByRole("tab", { name: /^All/ })
  const year2026 = page.getByRole("tab", { name: /^2026/ })
  const year2025 = page.getByRole("tab", { name: /^2025/ })
  await expect(allTab).toHaveAttribute("aria-selected", "true")
  const total = await archiveTotal(allTab)
  const total2026 = await archiveTotal(year2026)
  const total2025 = await archiveTotal(year2025)
  expect(total2026).toBeGreaterThan(4)
  expect(total2025).toBeGreaterThan(4)
  expect(total).toBe(total2026 + total2025)
  const photos = page.getByRole("button", { name: /^Open photo/ })
  expect(await photos.count()).toBeGreaterThan(4)
  expect(await photos.count()).toBeLessThan(total)
  const opener = photos.first()
  await opener.scrollIntoViewIfNeeded()
  await expectImageLoaded(opener.locator("img"))
  await expectNoOverflow(page)
  await page.screenshot({ path: testInfo.outputPath("gallery.png"), scale: "css", animations: "disabled" })
  await opener.click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText(`1 / ${total}`)
  await expectImageLoaded(dialog.locator("img"))
  await page.keyboard.press("ArrowRight")
  await expect(dialog).toContainText(`2 / ${total}`)
  await page.keyboard.press("ArrowLeft")
  await expect(dialog).toContainText(`1 / ${total}`)
  await page.keyboard.press("ArrowLeft")
  await expect(dialog).toContainText(`${total} / ${total}`)
  await dialog.getByRole("button", { name: "Next photo" }).click()
  await expect(dialog).toContainText(`1 / ${total}`)
  await dialog.getByRole("button", { name: "Close photo viewer" }).focus()
  await page.keyboard.press("Shift+Tab")
  await expect(dialog.getByRole("button", { name: "Next photo" })).toBeFocused()
  await page.screenshot({ path: testInfo.outputPath("lightbox.png"), scale: "css", animations: "disabled" })
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()

  await year2026.click()
  await expect(page).toHaveURL(/year=2026/)
  await expect(year2026).toHaveAttribute("aria-selected", "true")
  await expectPhotoSource(photos.first().locator("img"), "2026")
  await photos.first().click()
  await expect(dialog).toContainText(`1 / ${total2026}`)
  await page.keyboard.press("Escape")
  await year2026.focus()
  await page.keyboard.press("End")
  await expect(year2025).toHaveAttribute("aria-selected", "true")
  await expect(year2025).toBeFocused()
  await expect(page).toHaveURL(/year=2025/)
  await expectPhotoSource(photos.first().locator("img"), "2025")
  await page.reload()
  await expect(year2025).toHaveAttribute("aria-selected", "true")
  await year2025.focus()
  await page.keyboard.press("Home")
  await expect(allTab).toHaveAttribute("aria-selected", "true")
  await expect(page).toHaveURL(/\/gallery$/)
  const initialVisible = await photos.count()
  await page.getByRole("button", { name: "Load more photos" }).click()
  await expect.poll(() => photos.count()).toBeGreaterThan(initialVisible)
  await expect(photos.nth(initialVisible)).toBeFocused()
  await expectNoOverflow(page)
})

test("home carousel opens a full-screen lightbox without navigating and respects reduced motion", async ({ page }, testInfo) => {
  await page.goto("/")
  const carousel = page.getByRole("region", { name: "VIAHACK gallery", exact: true })
  await carousel.scrollIntoViewIfNeeded()
  await expect(carousel.getByRole("button", { name: "Play carousel" })).toBeDisabled()
  const photos = carousel.getByRole("button", { name: /^Open photo/ })
  const count = await photos.count()
  expect(count).toBeGreaterThan(1)
  const viewport = carousel.locator('[aria-label="Photo slides"]')
  await viewport.focus()
  await page.keyboard.press("ArrowLeft")
  await expect(carousel).toContainText(`${String(count).padStart(2, "0")} / ${String(count).padStart(2, "0")}`)
  await page.keyboard.press("ArrowRight")
  await expect(carousel).toContainText(`01 / ${String(count).padStart(2, "0")}`)
  const opener = photos.first()
  const currentUrl = page.url()
  await opener.click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(currentUrl)
  await expect(dialog).toContainText(`1 / ${count}`)
  await expectImageLoaded(dialog.locator("img"))
  const bounds = await dialog.boundingBox()
  expect(bounds?.x).toBe(0)
  expect(bounds?.y).toBe(0)
  expect(bounds?.width).toBe(page.viewportSize()?.width)
  expect(bounds?.height).toBe(page.viewportSize()?.height)
  await page.screenshot({ path: testInfo.outputPath("home-lightbox.png"), scale: "css", animations: "disabled" })
  await page.keyboard.press("Escape")
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
  await expect(page).toHaveURL(currentUrl)
})

test("carousel moves automatically, pauses and resumes, and stops when reduced motion is enabled", async ({ page, isMobile }) => {
  test.skip(isMobile, "Playback timing is covered once on desktop; mobile covers touch navigation")
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.goto("/")
  const carousel = page.getByRole("region", { name: "VIAHACK gallery", exact: true })
  await carousel.scrollIntoViewIfNeeded()
  await page.mouse.move(0, 0)
  const firstSlide = carousel.getByRole("group").first()
  const position = () => firstSlide.evaluate(element => element.getBoundingClientRect().x)
  const initial = await position()
  await expect.poll(async () => Math.abs(await position() - initial)).toBeGreaterThan(5)
  await carousel.getByRole("button", { name: "Pause carousel" }).click()
  await expect(carousel.getByRole("button", { name: "Play carousel" })).toBeEnabled()
  await page.mouse.move(0, 0)
  const paused = await position()
  await page.waitForTimeout(350)
  expect(Math.abs(await position() - paused)).toBeLessThan(0.5)
  await carousel.getByRole("button", { name: "Play carousel" }).click()
  await page.mouse.move(0, 0)
  await expect.poll(async () => Math.abs(await position() - paused)).toBeGreaterThan(5)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(carousel.getByRole("button", { name: "Play carousel" })).toBeDisabled()
  const reduced = await position()
  await page.waitForTimeout(350)
  expect(Math.abs(await position() - reduced)).toBeLessThan(0.5)
})

test("mobile navigation and photo swipes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Touch and collapsed navigation apply to mobile")
  await page.goto("/")
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused()
  await page.getByRole("button", { name: "Open menu" }).click()
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Gallery", exact: true }).click()
  await expect(page).toHaveURL(/\/gallery$/)
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible()
  const total = await archiveTotal(page.getByRole("tab", { name: /^All/ }))
  await page.getByRole("button", { name: /^Open photo 1:/ }).click()
  const dialog = page.getByRole("dialog")
  const surface = dialog.locator('[style*="touch-action"]')
  const touch = await page.context().newCDPSession(page)
  const bounds = await surface.boundingBox()
  if (!bounds) throw new Error("Photo swipe surface is missing")
  const y = bounds.y + bounds.height / 2
  const left = bounds.x + bounds.width * 0.25
  const right = bounds.x + bounds.width * 0.75
  await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: right, y }] })
  await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: left, y: y + 5 }] })
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] })
  await expect(dialog).toContainText(`2 / ${total}`)
  await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: left, y }] })
  await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: right, y: y + 5 }] })
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] })
  await expect(dialog).toContainText(`1 / ${total}`)
  await dialog.getByRole("button", { name: "Close photo viewer" }).click()
  await expect(dialog).not.toBeVisible()
  await touch.detach()
})
