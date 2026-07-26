import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { goal, level, days, hoursPerDay } = await request.json();

    const schedule = Array.from({ length: days }, (_, index) => {
      const day = index + 1;

      return {
        day,
        topic:
          day <= days * 0.3
            ? `Foundation of ${goal}`
            : day <= days * 0.7
            ? `Intermediate ${goal} Skills`
            : `Advanced ${goal} Projects and Revision`,
        tasks: [
          `Study ${goal} concepts for ${hoursPerDay / 2} hours`,
          `Practice exercises related to ${goal}`,
          `Review notes and improve weak areas`,
        ],
      };
    });

    const plan = {
      title: `${goal} ${days}-Day Study Roadmap`,
      overview: `A ${level} level roadmap designed for ${hoursPerDay} hours per day to help you progress toward ${goal}.`,
      schedule,
    };

    return NextResponse.json(plan);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate study plan",
      },
      {
        status: 500,
      }
    );
  }
}