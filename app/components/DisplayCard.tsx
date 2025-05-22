'use client';

interface DisplayCardProps {
    label: string;
    value?: string | number;
}

export default function DisplayCard({ label, value }: DisplayCardProps) {
    return (
        <div className="flex flex-col bg-gray-900 justify-center items-center p-4 rounded-sm border border-gray-300">
            <div className="w-full">
                <p className="text-shamrock-200 text-left text-sm">{label}</p>
                <p className="text-white text-lg text-left">{value}</p>
            </div>
        </div>
    );
}

