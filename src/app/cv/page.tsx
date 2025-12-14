export default function ResumePage() {
  const resumeUrlFileId = process.env.RESUME_URL_FILE_ID

  if (!resumeUrlFileId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <p>Resume URL not configured.</p>
      </div>
    )
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-[#111010]">
      <iframe
        src={`https://drive.google.com/file/d/${resumeUrlFileId}/preview`}
        className="h-full w-full border-none"
        title="Resume"
        allow="autoplay"
      />
    </div>
  )
}
