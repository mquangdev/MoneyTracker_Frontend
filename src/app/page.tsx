"use client";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { KEY_STORAGE } from "@/contants/storage.constants";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Login from "./auth/login/page";
import Register from "./auth/register/page";

export interface Language {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  const laguages: Language[] = [
    {
      id: 0,
      name: "Tiếng Việt",
      image: "/images/vietnam.png",
    },
    {
      id: 1,
      name: "English",
      image: "/images/england.png",
    },
  ];
  const [language, setLanguage] = useState<Language>(laguages[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [openLoginPage, setOpenLoginPage] = useState<boolean>(false);
  const [openRegisterPage, setOpenRegisterPage] = useState<boolean>(false);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const savedLangKey = localStorage.getItem(KEY_STORAGE.LANGUAGE);
    if (savedLangKey) {
      setLanguage(laguages[Number(JSON.parse(savedLangKey))]);
    }
  }, []);

  function onSelectLanguage(item: Language) {
    localStorage.setItem(KEY_STORAGE.LANGUAGE, JSON.stringify(item.id));
    setLanguage(item);
    setOpen(false);
  }

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  function onOpenLoginPage(open: boolean) {
    setOpenLoginPage(open);
  }

  function onOpenRegisterPage(open: boolean) {
    setOpenRegisterPage(open);
  }

  function handleLoginAndRegister(page: "Login" | "Register") {
    if (page === "Login") {
      setOpenLoginPage(true);
      setOpenRegisterPage(false);
    } else {
      setOpenLoginPage(false);
      setOpenRegisterPage(true);
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
          <div className="text-primary">MoneyTracker</div>
        </div>
        <div>
          <Sheet open={open} onOpenChange={(open) => onOpenChange(open)}>
            <SheetTrigger asChild>
              <Button
                className="bg-secondary cursor-pointer text-primary"
                variant="default"
              >
                {language.name}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="bg-secondary text-white mobile-layout"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Chọn ngôn ngữ</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mx-5 bg-gray-700 rounded-t-sm">
                {laguages.map((item) => (
                  <div
                    onClick={() => onSelectLanguage(item)}
                    key={item.id}
                    className="flex items-center gap-1 hover:bg-gray-800 w-full px-6 cursor-pointer pt-2"
                  >
                    <Image
                      src={item.image!}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    <div className="ml-2">{item.name}</div>
                    {language.id == item.id && (
                      <div className="ml-auto">
                        <i className="fa-solid fa-check text-primary"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-5 mb-auto">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{ align: "start", loop: true }}
          setApi={setApi}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 h-full">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Sheet
          open={openRegisterPage}
          onOpenChange={(open) => onOpenRegisterPage(open)}
        >
          <SheetTrigger asChild>
            <Button className="bg-primary cursor-pointer">
              Đăng ký miễn phí
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-secondary text-white h-[90%] mobile-layout border-none"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Đăng Ký</SheetTitle>
            </SheetHeader>
            <Register handleLoginAndRegister={handleLoginAndRegister} />
          </SheetContent>
        </Sheet>
        <Sheet
          open={openLoginPage}
          onOpenChange={(open) => onOpenLoginPage(open)}
        >
          <SheetTrigger asChild>
            <Button className="bg-secondary text-primary cursor-pointer">
              Đăng nhập
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-secondary text-white h-[90%] mobile-layout border-none"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Đăng nhập</SheetTitle>
            </SheetHeader>
            <Login handleLoginAndRegister={handleLoginAndRegister} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
