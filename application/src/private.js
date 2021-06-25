const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

export const SERVER_IP = windowsPlatforms.indexOf(window.navigator.platform) < 0 ? 'http://localhost:4000' : 'http://10.0.0.32:4000';