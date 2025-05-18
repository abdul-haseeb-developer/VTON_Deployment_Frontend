import React from 'react';
import { motion } from 'framer-motion';

const teamMemberVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -5, transition: { duration: 0.2 } },
};

function TeamMemberCard({ member }) {
  return (
    <motion.div className="bg-white rounded-lg shadow-md p-6 text-center" variants={teamMemberVariants} whileHover="hover">
      <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h5 className="text-lg font-semibold text-indigo-700 mb-1">{member.name}</h5>
      <p className="text-gray-500 text-sm">{member.role}</p>
    </motion.div>
  );
}

export default TeamMemberCard;