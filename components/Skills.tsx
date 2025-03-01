'use client';

import React from 'react';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './Card';
import { skills } from '../lib/skills';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="p-4 rounded-lg border border-[#e2e8f0] dark:border-[#4a5568] bg-[#ffffff] dark:bg-[#2d3748]">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-[#2d3748] dark:text-[#ffffff]">
        {skill.name}
      </h3>
      <span className="text-sm text-[#718096] dark:text-[#a0aec0]">
        {skill.category}
      </span>
    </div>
    <div className="w-full bg-[#edf2f7] dark:bg-[#4a5568] rounded-full h-2">
      <div
        className="bg-[#c5a572] h-2 rounded-full"
        style={{ width: `${skill.level}%` }}
      />
    </div>
    <div className="mt-1 text-right text-sm text-[#718096] dark:text-[#a0aec0]">
      {skill.level}%
    </div>
  </div>
);

const Skills: React.FC = () => {
  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-8">
      <Card className="w-full bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#2c3e50] dark:text-[#ffffff]">
            スキルセット
          </CardTitle>
          <CardDescription className="text-[#666666] dark:text-[#a0aec0]">
            習得済みの技術スタック
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
