import { JSX } from '@emotion/react/jsx-runtime';

export default function Button({ icon, quality }: { icon: JSX.Element; quality?: number }) {
    return (
        <div className="flex-1/3 flex justify-center items-center border-l-1 border-r-1 py-1 hover:bg-amber-50 gap-2">
            <p>{icon} </p>
            <span className="text-sm font-bold text-gray-500">{quality}</span>
        </div>
    );
}
