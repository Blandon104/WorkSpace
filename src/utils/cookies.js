/**
 * Crea o actualiza una cookie.
 * @param {string} nombre Nombre de la cookie.
 * @param {string} valor Valor que se guardará.
 * @param {number} diasExpiracion Días hasta la expiración.
 * @param {{secure?: boolean, sameSite?: 'Strict'|'Lax'|'None', path?: string}} opciones Atributos opcionales de la cookie.
 */
export function setCookie(nombre, valor, diasExpiracion, opciones = {}) {
  const {
    secure = location.protocol === 'https:',
    sameSite = 'Lax',
    path = '/',
  } = opciones;

  const expiracion = new Date();
  expiracion.setTime(
    expiracion.getTime() + diasExpiracion * 24 * 60 * 60 * 1000
  );

  const partes = [
    `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)}`,
    `expires=${expiracion.toUTCString()}`,
    `path=${path}`,
    `SameSite=${sameSite}`,
  ];

  if (secure) {
    partes.push('Secure');
  }

  document.cookie = partes.join('; ');
}

/**
 * Busca una cookie visible para JavaScript.
 * @param {string} nombre Nombre de la cookie.
 * @returns {string|null} Valor de la cookie o null si no existe.
 */
export function getCookie(nombre) {
  const nombreCodificado = encodeURIComponent(nombre) + '=';
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const cookieLimpia = cookie.trim();
    if (cookieLimpia.startsWith(nombreCodificado)) {
      return decodeURIComponent(cookieLimpia.slice(nombreCodificado.length));
    }
  }

  return null;
}

/**
 * Elimina una cookie reutilizando setCookie con una expiración pasada.
 * @param {string} nombre Nombre de la cookie.
 * @param {{secure?: boolean, sameSite?: 'Strict'|'Lax'|'None', path?: string}} opciones Atributos de alcance de la cookie.
 */
export function deleteCookie(nombre, opciones = {}) {
  setCookie(nombre, '', -1, opciones);
}
