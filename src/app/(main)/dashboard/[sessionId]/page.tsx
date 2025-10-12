"use client";


export default function Page({ params }: { params: { sessionId: string } }) {
  const { sessionId } = params;

  return <div>Session Page: {sessionId}</div>


}