import {useEffect, useRef} from "react";

export type TComponentEventHandler = {
    event: string;
    handler: (event: Event) => void;
}

export type TComponentEventHandlersArray = TComponentEventHandler[];

export interface ComponentEventHandlersProps {

    handlers?: TComponentEventHandlersArray;
    children: any;
}

export default function ComponentEventHandlers(props : ComponentEventHandlersProps) {

    const childrenRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const htmlElm = childrenRef.current;
        console.log('useEffect - register event handler', childrenRef);

        props.handlers?.forEach(item => {
            htmlElm?.addEventListener(item.event, item.handler);
        })

        return () => {
            console.log('useEffect cleanup event handler');
            props.handlers?.forEach(item => {
                htmlElm?.removeEventListener(item.event, item.handler);
            })
        }
    }, [childrenRef]);

    return (
        <div ref={childrenRef}>
            { props.children }
        </div>
    )
}
