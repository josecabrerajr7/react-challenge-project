const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

export const SERVER_IP = windowsPlatforms.indexOf(window.navigator.platform) < 0 ? 'http://localhost:4000' : 'http://192.168.50.208:4000';