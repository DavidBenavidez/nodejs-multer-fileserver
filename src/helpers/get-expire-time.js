/**
 * Calculates the expire time for an
 * uploaded document.
 * @returns {number}
 */
export default function getDocumentExpireTime() {
  // Get clean up time from environment
  const { env = {} } = process;
  const {
    CLEAN_UP_TIME_SECONDS = 86400,
   } = env;
  const cleanTime = +CLEAN_UP_TIME_SECONDS;

  // Add clean up time to current date
  const dateNow = new Date();
  const expiresAt = dateNow
  .setSeconds(dateNow.getSeconds() + cleanTime);

  return expiresAt;
}