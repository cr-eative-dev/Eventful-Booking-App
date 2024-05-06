"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getNewUrl = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    return formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
  };

  const previousUrl = getNewUrl("prev");
  const nextUrl = getNewUrl("next");

  useEffect(() => {
    // Prefetch the previous and next pages
    if (Number(page) > 1) {
      router.prefetch(previousUrl);
    }
    if (Number(page) < totalPages) {
      router.prefetch(nextUrl);
    }
  }, [page, previousUrl, nextUrl, router, totalPages]);

  const handleNavigation = (direction: string) => {
    const newUrl = getNewUrl(direction);

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28 hover:bg-neongreen hover:text-black"
        disabled={Number(page) <= 1}
        onClick={() => handleNavigation("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28 hover:bg-neongreen hover:text-black"
        disabled={Number(page) >= totalPages}
        onClick={() => handleNavigation("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
