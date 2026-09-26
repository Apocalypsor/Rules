/* Surge HTTP-response script. Local simulated purchase status only. */
(function () {
  const endpoint = /^https:\/\/api\.immivision\.net\/v1\/getUserMetadata\/?(?:\?.*)?$/;
  if ($request.method !== "POST" || !endpoint.test($request.url)) {
    $done({});
    return;
  }

  let result = {};
  try {
    const data = JSON.parse($response.body);
    if (data && typeof data === "object" && !Array.isArray(data) &&
        typeof data.isPaid === "boolean") {
      data.isPaid = true;
      // Simulated dates: the HAR contains no successful purchase sample.
      data.subscriberSince = data.subscriberSince || new Date().toISOString();
      data.nextRenewalAt = "2099-12-31T23:59:59.000Z";
      result = { body: JSON.stringify(data) };
      console.log("[Case Tracker] Applied local paid-status simulation");
    } else {
      console.log("[Case Tracker] Unexpected response structure; unchanged");
    }
  } catch (_) {
    console.log("[Case Tracker] Response is not JSON; unchanged");
  }
  $done(result);
})();
