const loginWith = async (page, username, password) => {
  await page.getByPlaceholder('enter username here').fill(username)
  await page.getByPlaceholder('enter password here').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

export { loginWith }
