import { JSX } from '@emotion/react/jsx-runtime';

export default function Button({ icon }: { icon: JSX.Element }) {
    return (
        <div className="flex-1/3 flex justify-center border-l-1 py-3 hover:bg-amber-50">{icon}</div>
    );
}
