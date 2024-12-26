import { ChangeEvent } from 'react';
import Link from 'next/link';

interface Props {
	labelId: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	placeholder: string;
	children: React.ReactNode;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;
	
}

export default function Input({
	labelId,
	type,
	onChange,
	value,
	children,
	link,
	placeholder,
	required = false,
}: Props) {
	return (
		<div>
			<div className='flex justify-between align-center'>
				<label
					htmlFor={labelId}
					className='block text-sm font-semibold leading-6 text-gray-900'>
					{children}
				</label>
				{link && (
					<div className='text-sm'>
						<Link
							className='font-semibold text-primary hover:text-secondary'
							href={link.linkUrl}>
							{link.linkText}
						</Link>
					</div>
				)}
			</div>
			<div className='mt-2'>
				<input
					id={labelId}
					className='block w-full border-b border-0  py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-0 focus:ring-none focus:ring-primary sm:text-sm sm:leading-6'
					name={labelId}
					type={type}
					onChange={onChange}
					value={value}
					required={required}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
