export function setCookies(cookies) {
  const cookieVal = cookies.reduce((acc, { key, val }) => {
    acc.push(`${key}=${val};`);
    return acc;
  }, []);

  const d = new Date();
  d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
  const expires = `expires=${+d.toUTCString()}`;
  cookieVal.forEach((cookie) => {
    document.cookie = `${cookie};${expires};path=/`;
  });
}

/**
 * Return: object containing name value pair for cookie
 */
export function getCookie() {
  return document.cookie
    .split(';')
    .reduce((acc, data) => {
      const [k, v] = data.split('=');
      acc[k.trim()] = v.trim();
      return acc;
    }, {});
}

/**
 * @Params  array if cookie names e.g. ['id', 'userName']
 */
export function clearSessionCookie(cookies) {
  Object.entries(getCookie())
    .filter((cookie) => cookies.includes(cookie[0].trim()))
    .forEach((cookie) => {
      document.cookie = `${cookie[0]}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });
}
