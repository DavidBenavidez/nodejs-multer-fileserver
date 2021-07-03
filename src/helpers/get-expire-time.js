export default function getDocumentExpireTime() {
  const { env = {} } = process;
  const {
    CLEAN_UP_TIME_SECONDS = 86400,
   } = env;
  const cleanTime = +CLEAN_UP_TIME_SECONDS;
  const dateNow = new Date();
  const expiresAt = dateNow
  .setSeconds(dateNow.getSeconds() + cleanTime);

  return expiresAt;
}