import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-amber-100">
        <Link href="/dashboard">
          <Button className="bg-amber-200 border-2 border-black text-black hover:text-white hover:border-white ">Lets play</Button>
        </Link>
      </div>
    </>
  );
}
