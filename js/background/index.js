/** Whether to block facebook or not. */
var block = true;

/** TODO */
var filter = { urls: ['<all_urls>'] };

/** TODO */
var extras = ['blocking'];

/** List of urls to block, gets looped through onBeforeRequest. */
var urls_to_block = [
  'facebook.com'
];

/** Counter that gets incremented when a request is blocked. */
var total_blocks = 0;

/**
 * Returns a global variable its value.
 *
 * @param {string} key - Which variable its value to return
 * @return {any} - Global variable its value
 */
function get(key) {
  return window[key];
}

/**
 * Sets a global variable, if the variable already exists, it overwrites.
 *
 * @param {string} key - Global variable name
 * @param {any} value - Value to bind to the global variable
 */
function set(key, value) {
  window[key] = value;
}

/**
 * Gets called before every single request chrome makes. If the global
 * variable block is set to true, blocks all request with urls that contain
 * an (url) string found in the urls_to_block array.
 *
 * @param {object} req -
 * @return {object} -
 */
function onBeforeRequest(req) {
  // Whether to block the current request, by default its false. Gets set to
  // true if a request its url matches a string found in urls_to_block.
  var cancel_req = false;

  if (!block) {
    return;
  }

  // Loop through urls_to_block and set cancel_req to true if the current
  // request its url matches a string found in urls_to_block.
  urls_to_block.forEach(function (url_to_block) {
    if (req.url.indexOf(url_to_block) !== -1) {
      cancel_req = true;
    }
  });

  if (cancel_req) {
    total_blocks++;
  }

  return {
    cancel: cancel_req
  };
}

// Bind the onBeforeRequest function to the chrome onBeforeRequest event
// using the filter and extras defined at the top of this file.
chrome.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  filter,
  extras
);