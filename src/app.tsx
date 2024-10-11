import { useCallback, useEffect, useRef, useState } from 'react'
import { rat, user, battle as battleMock } from './mock';
import BattleEvent, { ACTION_TYPE } from './entities/BattleEvent';
import Battle from './entities/Battle';

// TODO: explain
function getRandomizer(min: number, max: number) {
  return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
}

// POC: Start the battle event
export function App () {
  const [battle, setBattle] = useState<Battle>(battleMock);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user, monster } = battle;

  // R20 atacou o Goblin tirando 3 pontos de vida
  const eventFormatter = (battleEvent: BattleEvent | string) => {
    if (typeof battleEvent === "string") {
      return battleEvent
    }

    if (battleEvent.actionType === ACTION_TYPE['base-attack']) {
      return `${battleEvent.sender.name} atacou o ${battleEvent.receiver.name} tirando ${battleEvent.result.receiver?.hp! * -1} pontos de vida`;
    }

    throw new Error('EventFormatter: NOT IMPLEMENTED');
  }

  // TODO: reuse this baseAtk
  const baseAtk = useCallback(() => {
    const atk = getRandomizer(user.character.atk.min, user.character.atk.max);
    const isReceiverDead = monster.hp - atk <= 0;

    const battleEvent = new BattleEvent({
      actionType: ACTION_TYPE['base-attack'],
      sender: {
        name: user.nick,
      },
      receiver: {
        name: monster.name,
      },
      result: {
        sender: {
          isWinner: isReceiverDead,
        },
        receiver: {
          hp: atk * -1
        }
      }
    })

    setBattle((battle) => { return {
      ...battle, 
      events: [
        ...battle.events,
        battleEvent,
      ],
      monster: { 
        ...monster, 
        hp: monster.hp - atk 
      }
    }});

    if (isReceiverDead) {
      alert('BOA POOOOOO!');
    }

    // present the log
    // todo: check if monster or user is dead
  }, [monster]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [battle.events]);

  console.log(JSON.stringify(battle));

  return (
    <div className='App'>
      <div style={{ display: 'flex', gap: 200, width: '100%', justifyContent: 'center', marginTop: 20 }}>
        <textarea ref={textareaRef} style={{ width: '700px', height: '500px' }} value={battle.events.map(eventFormatter).join("\n")} readOnly />
      </div>
      <div style={{ display: 'flex', gap: 200, width: '100%', justifyContent: 'center', marginTop: 20 }}>
        <div>
          <h1>r20</h1>
          <h2>HP: {user.character.hp} / MP: {user.character.mp}</h2>
        </div>
        <div>
          <h1>{monster.name}</h1>
          <h2>HP: {monster.hp} / MP: -</h2>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5, width: '100%', justifyContent: 'center', marginTop: 20 }}>
        <button onClick={baseAtk}>Atacar ({user.character.atk.min} a {user.character.atk.max})</button>
        <button>Bola de fogo (MP: {user.character.mp})</button>
        
        {user.character.items.map(item => {
          return (
            <button>{item.name}: {item.quantity}</button>
          )
        })}
      </div>
    </div>
  )
}
