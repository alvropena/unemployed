import Image from "next/image";

interface TestimonialCardProps {
    quote: string
    author: string
    role: string
    avatarUrl: string
  }
  
  export default function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
    return (
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <div className="flex items-center mb-4">
          <div className="mr-4 rounded-full overflow-hidden h-12 w-12">
            <Image
              src={avatarUrl}
              alt={`${author} avatar`}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{author}</h4>
            <p className="text-sm text-slate-500">{role}</p>
          </div>
        </div>
        <p className="text-slate-700 italic">&ldquo;{quote}&rdquo;</p>
      </div>
    )
  }
  
  