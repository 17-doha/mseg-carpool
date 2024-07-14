import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './Styles.css';

const DialogDemo = () => (
    <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="Button violet">Edit profile</button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
                
                <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                    <Dialog.Close asChild>
                        <button className="Button green">Save changes</button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
);

export default DialogDemo;