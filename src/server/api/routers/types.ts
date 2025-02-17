import { Prisma } from "@prisma/client";

export const ventureInclude = Prisma.validator<Prisma.VentureInclude>()({
  applications: {
    include: {
      venture: true,
      investor: {
        include: {
          user: true,
        },
      },
    },
  },
  founder: {
    include: {
      user: true,
    },
  },
  payoutReports: true,
  buildingReports: true,
});

export type VentureApplicationUser = Prisma.VentureGetPayload<{
  include: typeof ventureInclude;
}>;

export const applicationInclude = Prisma.validator<Prisma.ApplicationInclude>()(
  {
    venture: true,
    investor: {
      include: {
        user: true,
      },
    },
  },
);

export type ApplicationVenture = Prisma.ApplicationGetPayload<{
  include: typeof applicationInclude;
}>;
