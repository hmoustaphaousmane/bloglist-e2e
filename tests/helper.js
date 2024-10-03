const loginWith = async (page, username, password) => {
  await page.getByPlaceholder('enter username here').fill(username)
  await page.getByPlaceholder('enter password here').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByPlaceholder('blog title goes here').fill(title)
  await page.getByPlaceholder('blog author goes here').fill(author)
  await page.getByPlaceholder('blog url goes here').fill(url)

  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }
