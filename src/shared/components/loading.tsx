import cn from 'classnames';
import { FaSpinner } from 'react-icons/fa';

export interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
}

export function Loading({ full = false, block = false, className = '', ...rest }: I_LoadingProps) {
    function _renderLoading() {
        return <FaSpinner className={cn('h-4 w-4 animate-spin', className)} {...rest} />;
    }

    if (full) {
        return (
            <div
                className={cn(
                    'h-full w-full z-50 bg-white bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center',
                    className,
                )}
            >
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div
                className={cn(
                    'h-full w-full z-50 bg-white bg-opacity-50 absolute flex justify-center items-center',
                    className,
                )}
            >
                {_renderLoading()}
            </div>
        );
    }
    else {
        return _renderLoading();
    }
}