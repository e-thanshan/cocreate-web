const ProjectCard = ({name}) => {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="px-4 py-5 sm:p-6">{name}</div>
        </div>
    );
}

export default ProjectCard;