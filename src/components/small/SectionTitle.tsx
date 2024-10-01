interface SectionTitleProps{
    text: string;
}

export default function SectionTitle({text}:SectionTitleProps) {
    return (
        <div className="text-center">
            <h3 className="text-3xl bg-mainPurple py-4 text-gray-100">{text}</h3>
        </div>
    )
}