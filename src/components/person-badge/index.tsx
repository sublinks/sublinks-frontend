import React from 'react';
import { Person } from 'sublinks-js-client';
import Image from 'next/image';
import Link from 'next/link';
import { BodyText } from '../text';

interface PersonBadgeProps {
  person: Person
}

const PersonBadge = ({
  person
}:
PersonBadgeProps) => (
  <Link href={person.actor_id} className="flex rounded-sm bg-slate-300 dark:bg-slate-500 hover:bg-slate-400 hover:dark:bg-slate-600 px-4 py-2 m-4">
    {person.avatar && <Image src={person.avatar} alt="Site Banner" />}
    <BodyText className="font-bold dark:text-primary">{person.name}</BodyText>
  </Link>
);

export default PersonBadge;
