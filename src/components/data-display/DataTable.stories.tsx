import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DataTableColumn, DataTableProps } from './DataTable'
import { DataTable } from './DataTable'

interface UserRecord {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  country: string
}

const roles: UserRecord['role'][] = ['Admin', 'Editor', 'Viewer']
const statuses: UserRecord['status'][] = ['Active', 'Inactive', 'Pending']
const countries = ['Mexico', 'Colombia', 'Chile', 'Argentina', 'Spain']

const buildUsers = (count: number): UserRecord[] =>
  Array.from({ length: count }).map((_, index) => {
    const id = index + 1

    return {
      id,
      name: `User ${id}`,
      email: `user${id}@navi-ui.dev`,
      role: roles[index % roles.length],
      status: statuses[index % statuses.length],
      country: countries[index % countries.length],
    }
  })

const userColumns: DataTableColumn<UserRecord>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 90,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
]

type UserTableProps = Omit<DataTableProps<UserRecord>, 'data' | 'columns'> & {
  data?: UserRecord[]
  columns?: DataTableColumn<UserRecord>[]
}

const UserTable = ({ data = buildUsers(12), columns = userColumns, ...props }: UserTableProps) => (
  <DataTable<UserRecord> data={data} columns={columns} {...props} />
)

const meta: Meta<typeof UserTable> = {
  title: 'DataDisplay/DataTable',
  component: UserTable,
  tags: ['autodocs'],
  args: {
    pagination: true,
    sorting: true,
    filtering: true,
    selection: false,
    pageSize: 10,
    loading: false,
    stickyHeader: false,
    exportCSV: false,
    emptyMessage: 'No results found',
    caption: 'User data table',
  },
  argTypes: {
    onRowClick: { action: 'row-click' },
    className: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof UserTable>

export const Default: Story = {}

export const WithSelection: Story = {
  args: {
    selection: true,
  },
}

export const WithLoading: Story = {
  args: {
    loading: true,
  },
}

export const WithEmpty: Story = {
  args: {
    data: [],
  },
}

export const FullFeatured: Story = {
  render: () => {
    const FullFeaturedExample = () => {
      const [clicked, setClicked] = React.useState<UserRecord | null>(null)

      return (
        <div className="space-y-3">
          <DataTable<UserRecord>
            data={buildUsers(50)}
            columns={userColumns}
            sorting
            filtering
            pagination
            selection
            exportCSV
            stickyHeader
            pageSize={10}
            caption="Full featured user data table"
            onRowClick={(row) => setClicked(row)}
          />
          {clicked ? (
            <p className="text-sm text-navi-neutral/70">
              Last clicked row: <span className="font-medium">{clicked.name}</span>
            </p>
          ) : null}
        </div>
      )
    }

    return <FullFeaturedExample />
  },
}