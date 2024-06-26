// components/input.txs 

const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoTitle) {
      alert("Title required");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = isEditing
        ? `/api/todo/${itemToEdit.id}/edit`
        : "/api/todo/create";

      const reqData = isEditing
        ? { todoTitle }
        : { todoTitle, id: itemToEdit.id };

      const reqMethod = isEditing ? "PATCH" : "POST";

      const requestData = {
        method: reqMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "Edit" : "Create"} Todo: ${
            response.statusText
          }`
        );
      }

      setTodoTitle("");
      toast.success(`${isEditing ? "Todo edited" : "Todo create"}`);

      // refresh page on successful request
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
      isEditing = false;
    }
  };
