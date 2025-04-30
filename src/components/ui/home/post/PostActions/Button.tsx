import { JSX } from '@emotion/react/jsx-runtime';

export default function Button({ icon, quality }: { icon: JSX.Element; quality?: number }) {
    return (
        <div className="flex flex-col items-center justify-center w-full hover:bg-amber-50 py-2 transition-colors cursor-pointer">
            <div className="flex items-center gap-1 text-gray-600">
                {icon}
                {quality !== undefined && <span className="text-sm font-semibold">{quality}</span>}
            </div>
        </div>
    );
}
