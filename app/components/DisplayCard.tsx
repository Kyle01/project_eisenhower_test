'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface DisplayCardProps {
    label: string;
    value?: string | number;
    information?: string;
}

export default function DisplayCard({ label, value, information }: DisplayCardProps) {
    return (
        <div className="flex flex-col bg-gray-900 justify-center items-center p-4 rounded-sm border border-gray-300">
            <div className="w-full">
                <div className="flex items-center gap-2">
                    <p className="text-shamrock-200 text-left text-sm">{label}</p>
                    {information && (
                        <div className="group relative pb-1">
                            <FontAwesomeIcon 
                                icon={faCircleInfo} 
                                className="text-shamrock-200/50 text-xs hover:text-shamrock-200 transition-colors"
                            />
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block">
                                <div className="bg-gray-800 text-white text-sm rounded px-2 py-1 w-[400px] break-words">
                                    {information}
                                </div>
                                <div className="w-2 h-2 bg-gray-800 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-white text-lg text-left">{value}</p>
            </div>
        </div>
    );
}

