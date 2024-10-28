import React, { useEffect, useRef } from "react";
import Battle from "@/entities/Battle";
import { eventFormatter } from "@/utils/eventFormatter";

type BattleMessageProps = {
  battle: Battle;
};

const BattleMessage = ({ battle }: BattleMessageProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [battle.events]);
  const formattedEvents = battle.events.map((event) =>
    eventFormatter(event)
  );
  return (
    <div className="flex gap-12 w-full justify-center mt-5">
      <textarea
        className="resize-none w-[700px] h-20 px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        ref={textareaRef}
        value={formattedEvents.join("\n")}
        readOnly
      />
    </div>
  );
};

export default BattleMessage;
