'use client';

import { useState, useEffect } from 'react';

// Definição do tipo para os emojis
interface Emoji {
  id: number;
  emoji: string;
  left: string;
  duration: string;
  delay: string;
}

export default function Home() {
  // Estados principais
  const [phase, setPhase] = useState(1); // Controle das fases
  const [currentIndex, setCurrentIndex] = useState(0); // Controle das frases
  const [showFinalMessage, setShowFinalMessage] = useState(false); // Exibição da mensagem final
  const [emojiList, setEmojiList] = useState<Emoji[]>([]); // Lista de emojis flutuantes

  const imagesWithMessages = [
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1276691173938823332/SORRISO.png?ex=675e1acf&is=675cc94f&hm=43df8dee7f2c90a26f06adafbf38af8b72b18d5bf114ca6134b5c1bf9c5dd34b&",
      alt: "Com muito esforço eu tenho você sorrindo, muito esforço mesmo, mas valeu a pena, que sorriso perfeito! ❤️",
      message: "Com muito esforço eu tenho você sorrindo, muito esforço mesmo, mas valeu a pena, que sorriso perfeito! ❤️",
    },
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1276691068762718262/FOFINHA.jpg?ex=675e1ab6&is=675cc936&hm=8d9c3f864948210245d871499a7bfe24470bd8758e062f82fc3878b362846246&",
      alt: "Essa foto é incrivel e mostra seu lado bobo de ser, acho super engraçada e me passar uma certa tranquilidade ❤️",
      message: "Essa foto é incrivel e mostra seu lado bobo de ser, acho super engraçada e me passar uma certa tranquilidade ❤️",
    },
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1276691116154028145/GATINHA.jpg?ex=675e1ac1&is=675cc941&hm=a4217d1bdb525ebb4eb2ba77379b3152578c52b93bbc20dbab54cedc435497b0&",
      alt: "Linda, Fofa, Perfeita cada detalhe em você é unico não tem como não adimirar sua beleza mesmo não sendo tão importante pra mim e vc sabe! ❤️",
      message: "Linda, Fofa, Perfeita cada detalhe em você é unico não tem como não adimirar sua beleza mesmo não sendo tão importante pra mim e vc sabe! ❤️",
    },
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1276691171166392370/SANGUE.jpg?ex=675e1ace&is=675cc94e&hm=e63116416efdb0408246d2e1de1acaa998939346afb10347e69de3b09f006c38&",
      alt: "Nao tive nos seus momentos de dor anteriores, mas farei meu melhor para que em todos os outros seja o primeiro a te dar a mão ❤️",
      message: "Nao tive nos seus momentos de dor anteriores, mas farei meu melhor para que em todos os outros seja o primeiro a te dar a mão ❤️",
    },
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1276691117274038313/GRR.jpg?ex=675e1ac2&is=675cc942&hm=00a2862ce386a6fdab96bab3d3a144c9d6e0ffb8dfbb01cb9911eebfedbee8c6&",
      alt: "Preciso dizer mais algo essa foto é perfeita mostra, mesmo no momento mais dificil, mesmo depois de uma briga feia vc tava sendo vc ❤️",
      message: "Preciso dizer mais algo essa foto é perfeita mostra, mesmo no momento mais dificil, mesmo depois de uma briga feia vc tava sendo vc ❤️",
    },
    {
      src: "https://cdn.discordapp.com/attachments/1276690702083821588/1280372108010061835/SPOILER_IMG_2530.jpg?ex=675e4ff2&is=675cfe72&hm=edcb457d5565647a778060ccf7ccc146d98a56daabc419985b8b10e9b6e6fd25&",
      alt: "Poderia descrever mais de 200 imagens falando o detalhe de cada uma de como vc me cativa, mas assim como essa nem tudo precisa ter motivo ❤️",
      message: "Poderia descrever mais de 200 imagens falando o detalhe de cada uma de como vc me cativa, mas assim como essa nem tudo precisa ter motivo ❤️",
    },
  ];
  

  // Lista de emojis
  const emojis = ['🎉', '🎊', '💖', '✨', '💫', '🎁'];

  // Paleta de cores (intercalada entre frases)
  const colors = ['#B8B8B8', '#2D1B1B', '#1B2D35', '#887D6E', '#8E8E8E'];

  // Frases (adicione todas as suas frases aqui)
  const phrases = [
    'Sua determinação em tudo o que faz, mesmo que às vezes não a tenha.',
    'O fato de transparecer quando está realmente animada.',
    'O jeito único de tentar resolver os problemas, mesmo que na maioria só aceite.',
    'Sua teimosia, que às vezes é encantadora.',
    'A risada inesperada que deixa mais descontraída a conversa.',
    'O esforço para mudar, mesmo eu não pedindo porra nenhuma.',
    'A paixão que coloca em suas opiniões.',
    'A vontade de ser independente.',
    'O tom sarcástico.',
    'O jeito como fala distraidamente.',
    'A forma como observa os detalhes ao seu redor.',
    'Seu lado carinhoso, mesmo que raríssimo.',
    'A empatia que você tenta demonstrar.',
    'O toque suave nas palavras gentis.',
    'O orgulho que te torna única.',
    'O jeito como valoriza as pequenas coisas.',
    'Sua autenticidade, mesmo em conflitos.',
    'O sorriso sincero, mesmo que tímido.',
    'A inteligência que você muitas vezes esconde.',
    'O esforço para entender meu mundo raramente.',
    'A doçura que surge inesperadamente, mesmo que nunca mais tenha visto.',
    'O jeito como você cuida de quem ama.',
    'A forma como você expressa sua criatividade, mesmo que rara.',
    'A paixão por suas próprias convicções.',
    'Como você tenta, mesmo sem admitir, fazer as pazes.',
    'O esforço para ser melhor a cada dia.',
    'O orgulho que a desafia a continuar.',
    'A maneira como você sempre se defende.',
    'Como você enxerga beleza nas coisas simples.',
    'O compromisso com quem você ama.',
    'A vulnerabilidade escondida por trás do orgulho.',
    'A coragem de enfrentar discussões intensas.',
    'O amor que você dá em gestos pequenos.',
    'A forma como você encara os erros com resiliência.',
    'Como você nunca deixa de ser quem é.',
    'O jeito único de mostrar seu carinho.',
    'A paciência que às vezes aparece.',
    'A força de sua personalidade.',
    'A fragilidade que você esconde.',
    'Como você ilumina a minha vida sem perceber.',
    'A maneira como tenta quebrar sua própria barreira.',
    'O amor incondicional que transparece nos momentos certos.',
    'A paixão pelo que acredita.',
    'A força de continuar mesmo quando está exausta.',
    'Como você tenta ser fofa, mesmo sem jeito.',
    'A voz firme quando acredita em algo.',
    'Como você se esforça para ser compreendida.',
    'O jeito como você me incentiva, mesmo indiretamente.',
    'A honestidade que às vezes machuca, mas é real.',
    'A brincadeira que surge quando menos espera.',
    'O cuidado com detalhes que eu nem percebo.',
    'Como você valoriza momentos simples ao lado dele.',
    'O jeito como você muda a energia de uma conversa.',
    'A sinceridade que você sempre traz consigo.',
    'O humor inesperado que a torna especial.',
    'O brilho no olhar quando fala sobre algo que ama.',
    'O jeito como ela me desafia a ser melhor.',
    'O amor que você entrega, mesmo sem perceber.',
    'O toque sutil quando quer demonstrar afeto.',
    'A determinação em não se deixar abalar.',
    'O esforço para manter o relacionamento vivo.',
    'Como você tenta expressar sentimentos, mesmo sendo difícil.',
    'A forma como você tenta ser única em tudo o que faz.',
    'Como você transforma situações comuns em algo especial.',
    'A vulnerabilidade que você esconde atrás do orgulho.',
    'O riso genuíno que derrete qualquer tensão.',
    'A criatividade que traz cor à minha vida.',
    'Como você deixa de tentar entender o mundo.',
    'A lealdade que você demonstra, mesmo em conflitos.',
    'O charme único de suas imperfeições.',
    'Como ela transforma a teimosia em determinação.',
    'O jeito como você se desculpa, mesmo sem palavras.',
    'A força em momentos de dúvida.',
    'O jeito como ela tenta enxergar o lado bom das coisas.',
    'A conexão especial que só nós temos.',
    'Como você faz com que eu me sinta importante.',
    'A monotonia com que você vive cada momento.',
    'A maneira como você me desafia a crescer.',
    'A falta de paixão com que você vive suas emoções.',
    'O jeito como você tenta quebrar barreiras emocionais.',
    'O amor que você dá, mesmo quando é difícil.',
    'A coragem de ser verdadeira.',
    'A paciência em momentos certos.',
    'A falta de esforço para mudar.',
    'A falta de maneira como você encara desafios emocionais.',
    'O carinho que ela tenta demonstrar com ações.',
    'A maneira como você me inspira a ser melhor.',
    'A conexão única que só nós compartilhamos.',
    'O toque humano em cada palavra dela.',
    'A verdade que ela tenta mostrar, mesmo nas falhas.',
    'O jeito como ela é verdadeira, mesmo sendo teimosa.',
    'PRA QUE EXPLICAR VOCÊ SE CHAMA HADASSA ISSO JA BASTA ❤️',
  ];

  // Gerar emojis continuamente durante a fase 3
  useEffect(() => {
    if (phase === 3) {
      const interval = setInterval(() => {
        setEmojiList((prevList) => [
          ...prevList,
          {
            id: Date.now(),
            emoji: emojis[Math.floor(Math.random() * emojis.length)], // Emoji aleatório
            left: `${Math.random() * 100}vw`, // Posição horizontal aleatória
            duration: `${5 + Math.random() * 5}s`, // Duração aleatória
            delay: `${Math.random() * 2}s`, // Atraso aleatório
          },
        ]);
      }, 500); // Gera um emoji a cada 500ms

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Remover emojis que completaram a animação
  useEffect(() => {
    if (emojiList.length > 0) {
      const timeout = setTimeout(() => {
        setEmojiList((prevList) => prevList.slice(1)); // Remove o primeiro emoji
      }, 6000); // Emojis desaparecem após 6 segundos

      return () => clearTimeout(timeout);
    }
  }, [emojiList]);

  // Exibição das frases, controlada por fase
  useEffect(() => {
    if (phase === 3 && currentIndex < phrases.length - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000); // Tempo de transição entre frases

      return () => clearInterval(interval);
    } else if (currentIndex >= phrases.length - 1) {
      setShowFinalMessage(true);
    }
  }, [phase, currentIndex]);

  // Controle de clique para mudar fases
  const handleClick = () => {
    if (phase < 7) { // Aumenta o limite para 5
      setPhase(phase + 1);
      if (phase === 3) {
        setCurrentIndex(0); // Reseta frases ao entrar na fase 4
      }
    }
  };
  
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        phase === 1
          ? 'bg-[#2D1B1B] text-[#B8B8B8]'
          : phase === 2
          ? 'bg-[#1B2D35] text-[#887D6E]'
          : phase === 3
          ? 'bg-black text-[#B8B8B8]'
          : 'bg-[#8E8E8E] text-[#2D1B1B]'
      } transition-colors duration-1500 ease-in-out`}
      onClick={handleClick}
    >
      {/* Fase 1: Saudação */}
      {phase === 1 && <h1 className="text-4xl font-bold">Oi 😊</h1>}

      {/* Fase 2: Parabéns */}
      {phase === 2 && (
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Parabéns minha princesa, hoje e todos os dias ao meu lado será seu dia!
          </h1>
          <p className="text-2xl">
            Eu gostaria de listar todas as coisas que amo em você:
          </p>
        </div>
      )}

      {/* Fase 3: Listagem de Frases */}
      {phase === 3 && !showFinalMessage && (
        <div className="relative overflow-hidden">
          {/* Lista de Frases */}
          <ul className="text-xl relative z-10">
            {phrases.map((phrase, index) => (
              <li
                key={index}
                className={`transition-opacity duration-1000 ${
                  index === currentIndex
                    ? 'opacity-100'
                    : index < currentIndex
                    ? 'opacity-0'
                    : 'opacity-0'
                }`}
                style={{
                  color: colors[index % colors.length], // Alterna cores pela paleta
                }}
              >
                {phrase}
              </li>
            ))}
          </ul>

          {/* Emojis Flutuantes */}
          <div className="absolute inset-0 pointer-events-none">
            {emojiList.map((emoji) => (
              <span
                key={emoji.id}
                className="emoji"
                style={{
                  left: emoji.left, // Posição horizontal aleatória
                  top: '-5%', // Sempre começa fora da tela, no topo
                  animation: `fall ${emoji.duration} linear ${emoji.delay}`, // Animação fluida
                  fontSize: '2.5rem',
                }}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mensagem Final */}
      {phase === 4 && (
        <h1 className="text-5xl font-bold text-center text-[#1B2D35]">
          O simples fato de você ser a Hadassa Goldner Pinheiro, já é o bastante!
        </h1>
      )}

      {/* Parte 5: Dedicatória */}
      {phase === 5 && (
        <div className="flex flex-col items-center justify-center text-center min-h-screen space-y-6">
          {/* Dedicatória */}
          <h1 className="text-4xl font-bold text-white">
            Obrigado por tudo que você já fez por mim!  
          </h1>
          <p className="text-2xl text-[#B8B8B8]">
            Meu presente vai ser duas coisinhas simples, mas feitas com bastante carinho.
          </p>

    {/* Link do Spotify */}
    <a
      href="https://open.spotify.com/playlist/68RKc2HSjZWdHwZQlZWZha?si=0e3b5584f5574684&pt=12a3342f9c2b9c29797ed6f824a081e2"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl text-[#2D1B1B] underline hover:text-[#1B2D35] transition-colors duration-500"
    >
      Ouça minha playlist dedicada a você 💖
    </a>

    {/* Link da Visual Novel */}
    <a
      href="#"
      className="text-xl text-[#2D1B1B] underline hover:text-[#1B2D35] transition-colors duration-500"
    >
      Jogue a visual novel que eu criei para você 🌟
    </a>
  </div>
)}
{phase === 6 && (
  <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
    <h1 className="text-4xl font-bold text-[#887D6E] text-center">
      Pequenos detalhes que me fazem te admirar ainda mais
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {imagesWithMessages.map((item, index) => (
        <div key={index} className="flex flex-col items-center space-y-4">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
          />
          <p className="text-xl text-[#B8B8B8] text-center">{item.message}</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* Fase 7: Carta com Tema Romântico */}
{phase === 7 && (
  <div className="flex items-center justify-center min-h-screen bg-pink-light p-10">
    {/* Container da Carta */}
    <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-4xl w-full border-8 border-[#FFC1D6]">
      {/* Rosa no lado esquerdo */}
      <img
        src="https://cdn.discordapp.com/attachments/1276690702083821588/1317352560239186071/download.png?ex=675e5fad&is=675d0e2d&hm=b5b57e7213b8f46a545e5c6918fb8b0e49f8e4e2338d8846dea04f253e7f13e1&" // Atualize com o link da rosa
        alt="Rosa"
        className="absolute -top-12 -left-12 w-80 h-auto"
      />

      {/* Texto da Carta */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#C85C5C] mb-6">
          Uma ultima mensagem pra ti gatinha 💌
        </h1>
        <p className="text-2xl leading-relaxed font-serif text-[#4A2F35]">
         Espero que possamos superar todos os desafios e fortalecer nosso relacionamento a cada dia, porque, sinceramente, eu não consigo imaginar minha vida sem você, de fato eu posso ser chato, babaca, idota entre outras coisas que vc me chama com raiva mas sempre é pensando no teu melhor mesmo que nao aparente!
        </p>
        <p className="text-2xl leading-relaxed font-serif text-[#4A2F35]">
         ASS. do teu amor💖
        </p>
      </div>

      {/* Rosa no lado direito */}
      <img
        src="https://cdn.discordapp.com/attachments/1276690702083821588/1317352560239186071/download.png?ex=675e5fad&is=675d0e2d&hm=b5b57e7213b8f46a545e5c6918fb8b0e49f8e4e2338d8846dea04f253e7f13e1&" // Atualize com o link da rosa
        alt="Rosa"
        className="absolute -bottom-12 -right-12 w-80 h-auto"
      />
    </div>
  </div>
)}


    </div>
  );
}
