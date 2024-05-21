import { lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";

const LazyLoadedImage = lazy(() => import("./LazyImage"));

function LazyImage({ src, alt, imageClassName = '', skeletonClassName = ''}: { src: string; alt: string; imageClassName: string; skeletonClassName: string; }) {
    return (
        <Suspense fallback={<Skeleton className={skeletonClassName} />}>
            <LazyLoadedImage src={src} alt={alt} className={imageClassName} />
        </Suspense>
    );
}

export default LazyImage;