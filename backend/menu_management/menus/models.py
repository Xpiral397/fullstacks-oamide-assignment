from django.db import models


import uuid


class MenuNode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="childrens",
        null=True,
        blank=True,
    )
    depth = models.PositiveIntegerField()
    children = models.JSONField(
        default=list, blank=True
    )  # Store children as a JSON list

    def __str__(self):
        return self.name
