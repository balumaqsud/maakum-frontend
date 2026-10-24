export type HomeFlag = "uz" | "ps" | "es";

export type HomeMessage = {
  name: string;
  place: string;
  flag: HomeFlag;
  time: string;
  body: string;
  likes: number;
  short?: boolean;
};

export const homeMessages: HomeMessage[] = [
  {
    name: "Madina",
    place: "Uzbekistan",
    flag: "uz",
    time: "2 hours ago",
    body: "We have not forgotten you. I hope you and your family are safe.",
    likes: 48,
  },
  {
    name: "Amal",
    place: "Gaza, Palestine",
    flag: "ps",
    time: "2 hours ago",
    body: "Thank you for remembering us. Your words mean more than you know.",
    likes: 31,
  },
  {
    name: "Daniel",
    place: "Spain",
    flag: "es",
    time: "5 hours ago",
    body: "I thought of you this morning over my coffee. I want you to know that there are people on the other side of the world who carry you in their hearts.",
    likes: 27,
    short: true,
  },
];
