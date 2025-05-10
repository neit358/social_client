import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { I_Post } from '@/types/post.interface';

export default function Table({
    rows,
    columns,
    paginationModel,
    loading = false,
}: {
    rows: Partial<I_Post>[];
    columns: GridColDef[];
    paginationModel: { page: number; pageSize: number };
    loading?: boolean;
}) {
    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                loading={loading}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
