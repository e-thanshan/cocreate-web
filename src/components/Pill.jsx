const Pill = ({data, hasX}) => {
    return (
        <div className="rounded-full px-2.5 py-0.5 bg-turq text-white flex w-fit items-center">
            {data}
            {hasX && (
                <div>
                    x
                </div>
            )}
        </div>
    );
}

export default Pill;