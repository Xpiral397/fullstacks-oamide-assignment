from .models import MenuNode
from django.db import transaction


@transaction.atomic
def process_node(data, parent=None):
    # Check if node exists
    node_id = data.get("id")
    node_name = data.get("name")
    node_depth = data.get("depth", 0)

    # Find or create the node
    node, created = MenuNode.objects.update_or_create(
        id=node_id, defaults={"name": node_name, "parent": parent, "depth": node_depth}
    )

    # Process children if they exist
    children = data.get("children", [])
    for child_data in children:
        process_node(child_data, parent=node)

    # Optionally: Handle deletion of nodes that are not in the children anymore
    existing_children_ids = [child_data.get("id") for child_data in children]
    node.children.exclude(id__in=existing_children_ids).delete()
