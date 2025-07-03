import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label {...props} className="text-sm font-medium text-graphite block mb-1" />
    );
}
