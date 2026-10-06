export const CALLBACK_URL_KEY = "callbackUrl";

function isSafeCallbackUrl(callbackUrl: string) {
  return callbackUrl.startsWith("/") && !callbackUrl.startsWith("//");
}

export function saveCallbackUrl(callbackUrl?: string) {
  if (!callbackUrl || !isSafeCallbackUrl(callbackUrl)) {
    return;
  }

  localStorage.setItem(CALLBACK_URL_KEY, callbackUrl);
}

export function getCallbackUrl() {
  const callbackUrl = localStorage.getItem(CALLBACK_URL_KEY);

  if (!callbackUrl || !isSafeCallbackUrl(callbackUrl)) {
    return null;
  }

  return callbackUrl;
}

export function clearCallbackUrl() {
  localStorage.removeItem(CALLBACK_URL_KEY);
}

export function getSafeCallbackUrl(callbackUrl: string | null) {
  if (!callbackUrl) {
    return null;
  }
  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return null;
  }
  return callbackUrl;
}
