export default function makeListFiles() {
  return async function listFiles() {
    // Create file here
    return [
      {
        fileName: 'resume.pdf',
        size: 1234,
      },
      {
        fileName: 'resume2.pdf',
        size: 1234,
      },
      {
        fileName: 'resume3.pdf',
        size: 1234,
      }
    ];
  }
}