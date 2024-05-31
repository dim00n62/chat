import Settings from '../Settings';
import Chat from '../Chat';

import classes from './styles.module.css';
import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { sendMessage } from '../../api';
import { Messages, MessageResponse } from '../../types';
import settingsConfig from '../../settingsConfig';

export default function App() {
    const [settingsOpened, setSettingsOpened] = useState(true);
    const [messages, setMessages] = useState<Messages>([{ id: 'initial', text: "Здравствуйте!\n\nЧтобы маркировать рекламу в eLama, необходимо выполнить следующие шаги:\n\n1. Перейдите в раздел \"Закон о рекламе\" и откройте вкладку \"Аккаунты\".\n2. Здесь вы увидите список всех ваших рекламных аккаунтов в различных системах (Яндекс Директ, Telegram Ads и др.).\n3. Нажмите \"Указать рекламодателя\" напротив нужного аккаунта.\n4. Выберите существующую карточку рекламодателя или создайте новую, заполнив необходимые данные.\n\nДля разных рекламных систем процесс маркировки отличается:\n\n- В Яндекс Директ, VK Рекламе и других системах реклама маркируется автоматически после указания рекламодателя.\n\n- В Telegram Ads нужно дополнительно настроить автомаркировку или получать токены самостоятельно. Также вы можете отредактировать статистику креативов для ЕРИР в разделе \"Отчеты для ЕРИР\".\n\n- Для Telega.in менеджеры системы сами получат токены и подготовят статистику.\n\nЕсли у вас есть клиенты, то дополнительно необходимо создать цепочку договоров для каждого клиента и ежемесячно заполнять отчеты для ЕРИР, подтверждая их отправку.\n\nБолее подробные инструкции по маркировке для разных случаев (рекламодатели, агентства, фрилансеры) вы можете найти в кабинете eLama в разделе \"Закон о рекламе\".", type: 'bot', date: Date.now() }]);
    const [params, setParams] = useState(settingsConfig.parameters.reduce((acc, item) => ({ ...acc, [item.id]: item.default }), {}));

    const onChangeParams = useCallback((paramUpdate: Record<string, number>) => {
        setParams(Object.assign(params, paramUpdate));
    }, [params, setParams]);

    const onSend = useCallback((text: string) => {
        const id = String(Math.random());
        setMessages(messages.concat({ id, text, type: 'user', loading: true, date: Date.now() }));
        sendMessage(text, params).then((data: MessageResponse) => {
            const copiedMessages = structuredClone(messages);
            copiedMessages.push({
                id: data.id,
                text: data.text,
                type: 'bot',
                date: data.created_at
            });
            const index = copiedMessages.findIndex((m) => id === m.id);
            copiedMessages[index].loading = false;

            setMessages(copiedMessages);
        });
    }, [params, setMessages, messages]);

    return (<article className={cn(classes.app, { [classes.noSettings]: !settingsOpened })}>
        {settingsOpened
            ? <Settings onChange={onChangeParams} onClose={() => setSettingsOpened(false)}/>
            : <IconButton className={classes.settingsButton} onClick={() => setSettingsOpened(true)}><SettingsIcon/></IconButton>}
        <Chat messages={messages} onSend={onSend} />
    </article>);
}
