export const getInitials = (name: string) => {
    const fullName = name.split(" ");
    const firstname = fullName[0];
    const lastname = fullName[1]
    const newName = firstname + " " + lastname
    const pattern = /\b\w/g
    return newName.match(pattern)?.join("").toUpperCase()
}
