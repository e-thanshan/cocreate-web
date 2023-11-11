const ProjectCard = ({data}) => {
    console.log(data);
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg w-full ">
            <div className="px-4 py-5 sm:p-6 ">
                <div className="font-bold">
                    {data.name}
                </div>
                <div className="pt-5 text-sm xl:text-md max-h-40 overflow text-ellipsis">
                    {data.Description}
                </div>

            </div>
        </div>
    );
}

export default ProjectCard;