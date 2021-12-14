import utilStyles from '../styles/utils.module.css';
import {
    Box,
    Button,
    Avatar,
    Divider,
    ListItem,
    TextField,
    Typography,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
// import FormatDate from '../lib/fromatDate';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { id } from 'date-fns/locale';

// KOMPONEN UNTUK REPLY, TAMPILAN KONTEN KOMENTAR DAN EDIT KOMENTAR 
export function InputComment({ disabled, localValue: localvalue, onChange, comment, id: commentId }: {
    disabled: boolean, localValue: string, onChange: any, comment: any, id: string
}) {
    // untuk reply, field comment tidak diisi / undefined
    // karena itu, timestamp hanya dibuat untuk edit komentar saja
    let timeStamp;
    if (comment) {
        const createdAt = !comment.createdAt ? comment.updatedAt : comment.createdAt;
        timeStamp = formatDistanceToNow(
            new Date(createdAt * 1000),
            { includeSeconds: true, locale: id }
        )
    }

    return (
        <>{disabled ?
            <ListItemText
                // MENAMPILKAN KOMENTAR 
                // timestamp terisi 
                primary={comment.identity.callName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={
                    <>
                        <Typography
                            gutterBottom
                            variant="caption"
                            sx={{
                                display: 'block',
                                color: 'text.disabled'
                            }}
                        >
                            {comment.updatedAt && 'diupdate: '}
                            {timeStamp + ' yang lalu'}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {comment.content}
                        </Typography>
                    </>
                }
            />
            :
            <TextField
                fullWidth
                multiline={true}
                id={commentId}
                inputProps={{ localvalue }}
                value={localvalue}
                onChange={onChange}
                size="small"
                placeholder="Tulis komentar"
                sx={{
                    '& fieldset': {
                        borderWidth: `1px !important`,
                        borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
                    }
                }}
            />
        }
        </>
    )
}

export function ButtonComment({ id: commentId, onClick, name }: { id: any, onClick: any, name: string }) {
    return (
        <>
            {name === 'show more' ? 
                <Button
                    size="large" 
                    // sx={{ position: 'relative', left: 0 }}
                    variant="contained"
                    id={commentId}
                    type="button"
                    name={name}
                    onClick={onClick}
                >{name}</Button>
                :
                <Button
                    size="small" sx={{ position: 'relative', right: 0 }}
                    id={commentId}
                    type="button"
                    name={name}
                    onClick={onClick}
                >{name}</Button>
            }
        </>
    )
}

export function InputMain({ formValue: formvalue, onChange }: { formValue: string, onChange: any }) {
    return (
        // <div>
        //     <textarea
        //         // className={utilStyles.textarea}
        //         value={formValue}
        //         onChange={onChange}
        //     />
        // </div>
        <TextField
            fullWidth
            multiline={true}
            // id={commentId}
            inputProps={{ formvalue }}
            value={formvalue}
            onChange={onChange}
            size="small"
            placeholder="Tulis komentar"
            sx={{
                '& fieldset': {
                    borderWidth: `1px !important`,
                    borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
                }
            }}
        />
    )
}

export function AddComment({ formValue, onChange, handleClick, isLoggedIn }: {
    formValue: string, onChange: any, handleClick: any, isLoggedIn: boolean
}) {
    return (
        <Box component="div" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
            {isLoggedIn &&
                <Box component="div" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
                    <InputMain
                        formValue={formValue}
                        onChange={onChange}
                    />
                </Box>
            }
            {isLoggedIn &&
                <Box>
                    <ButtonComment
                        id={2}
                        name="submit"
                        onClick={handleClick}
                    />
                </Box>
            }
        </Box>
    )
}