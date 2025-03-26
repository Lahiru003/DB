// /components/InstructorCard.tsx

import { FC } from 'react';

interface InstructorCardProps {
  instructor: {
    instructorid: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    skillset: string;
  };
}

export const InstructorCard: FC<InstructorCardProps> = ({ instructor }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white">
        {instructor.firstname} {instructor.lastname}
      </h3>
      <p className="text-gray-400">Email: {instructor.email}</p>
      <p className="text-gray-400">Phone: {instructor.phone}</p>
      <p className="text-gray-400">Skillset: {instructor.skillset}</p>
    </div>
  );
};
