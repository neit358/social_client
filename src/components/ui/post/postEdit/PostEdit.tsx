import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonPostEdit from './Button';

export default function PostEdit({
    id,
    setReload,
    reload,
}: {
    id: string;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
}) {
    return (
        <div className="flex justify-between">
            <ButtonPostEdit type={'edit'} postId={id}>
                <EditIcon />
            </ButtonPostEdit>
            <ButtonPostEdit
                type={'delete'}
                postId={id}
                titleConfirm="Confirm"
                messageConfirm="Do you want to delete this post?"
                setReload={setReload}
                reload={reload}
            >
                <DeleteIcon className="text-red-500" />
            </ButtonPostEdit>
        </div>
    );
}
